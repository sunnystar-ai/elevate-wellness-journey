
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { journalEntries, activities, wellnessScores, period, analyticalFramework = 'physical-emotional' } = await req.json();
    
    console.log('Generating wellness insight for period:', period);
    console.log('Using analytical framework:', analyticalFramework);
    console.log('Journal entries count:', journalEntries?.length);
    console.log('Activities count:', activities?.length);
    console.log('Wellness scores count:', wellnessScores?.length);

    // Prepare data summary for the prompt
    const journalSummary = journalEntries.map(entry => 
      `Date: ${new Date(entry.created_at).toLocaleDateString()}, 
       Feelings: ${entry.feelings.substring(0, 100)}..., 
       Thoughts: ${entry.thought_process.substring(0, 100)}..., 
       Gratitude: ${entry.gratitude.substring(0, 100)}...`
    ).join('\n');
    
    const activitiesSummary = activities.map(activity => 
      `Activity: ${activity.activity_name}, 
       Duration: ${activity.duration} ${activity.duration_unit}, 
       Date: ${new Date(activity.activity_date).toLocaleDateString()}, 
       Completed: ${activity.completed}`
    ).join('\n');
    
    const scoresSummary = wellnessScores.map(score => 
      `Date: ${new Date(score.score_date).toLocaleDateString()}, 
       Mental: ${score.mental_score}, 
       Physical: ${score.physical_score || 'N/A'}, 
       Sleep: ${score.sleep_score || 'N/A'}, 
       Nutrition: ${score.nutrition_score || 'N/A'}`
    ).join('\n');

    // Get personality data if available (from localStorage or database)
    let personalityData = {};
    try {
      // This would be expanded to actually fetch personality data from the database
      personalityData = {
        mbtiType: "INFJ", // Example - would be dynamically fetched
        bigFiveTraits: {
          openness: 85,
          conscientiousness: 75,
          extraversion: 45,
          agreeableness: 80,
          neuroticism: 60
        }
      };
    } catch (error) {
      console.log('No personality data available', error);
    }

    // Customize the prompt based on the selected analytical framework
    let systemPrompt = 'You are a wellness coach and mental health expert providing insights based on user data.';
    let userPrompt = '';

    switch (analyticalFramework) {
      case 'physical-emotional':
        systemPrompt = 'You are a wellness coach specializing in correlating physical habits with emotional states. You analyze how activities impact mood and mental wellbeing.';
        userPrompt = `
          As a wellness expert, analyze this user's data for the ${period} period and provide insights on how their physical activities are affecting their emotional states.
          
          JOURNAL ENTRIES:
          ${journalSummary}
          
          ACTIVITIES:
          ${activitiesSummary}
          
          WELLNESS SCORES:
          ${scoresSummary}
          
          Based on this data, provide:
          1. Clear correlations between specific physical activities (e.g., meditation, walks, sleep) and emotional states expressed in journals
          2. Identify activities that seem to boost positive emotions and those that may be lacking when negative emotions appear
          3. 2-3 specific, actionable recommendations to optimize their physical routine for emotional wellbeing
          4. A predictive insight about how maintaining certain activities will likely impact their future emotional state
          
          Format your response as a cohesive paragraph of 200-250 words that's supportive, personalized and empowering.
        `;
        break;
        
      case 'personality':
        systemPrompt = 'You are a wellness coach specializing in personality psychology. You analyze how personality traits influence behavior patterns and wellness routines.';
        userPrompt = `
          As a wellness expert, analyze how this user's personality traits might be influencing their wellness patterns during the ${period} period.
          
          PERSONALITY DATA:
          MBTI Type: ${personalityData.mbtiType || 'Unknown'}
          Big Five Traits: 
          ${personalityData.bigFiveTraits ? 
            `Openness: ${personalityData.bigFiveTraits.openness}%, 
             Conscientiousness: ${personalityData.bigFiveTraits.conscientiousness}%, 
             Extraversion: ${personalityData.bigFiveTraits.extraversion}%, 
             Agreeableness: ${personalityData.bigFiveTraits.agreeableness}%, 
             Neuroticism: ${personalityData.bigFiveTraits.neuroticism}%` : 'Not available'}
          
          JOURNAL ENTRIES:
          ${journalSummary}
          
          ACTIVITIES:
          ${activitiesSummary}
          
          WELLNESS SCORES:
          ${scoresSummary}
          
          Based on this data, provide:
          1. How their personality traits (especially MBTI and Big Five traits) might be influencing their wellness routines
          2. Identify activities that align well with their personality and those that might create friction
          3. 2-3 personalized recommendations for activities or routines that would complement their personality traits
          4. Predictive insight about how certain adjustments would likely benefit their wellbeing based on their personality profile
          
          Format your response as a cohesive paragraph of 200-250 words that's supportive, personalized and empowering.
        `;
        break;
        
      case 'belief-mapping':
        systemPrompt = 'You are a wellness coach specializing in cognitive psychology. You identify core beliefs from journal entries and analyze how these beliefs influence wellbeing.';
        userPrompt = `
          As a wellness expert, analyze this user's journal entries for the ${period} period to identify core beliefs and thought patterns.
          
          JOURNAL ENTRIES:
          ${journalSummary}
          
          PERSONALITY DATA:
          MBTI Type: ${personalityData.mbtiType || 'Unknown'}
          Big Five Traits: 
          ${personalityData.bigFiveTraits ? 
            `Openness: ${personalityData.bigFiveTraits.openness}%, 
             Conscientiousness: ${personalityData.bigFiveTraits.conscientiousness}%, 
             Extraversion: ${personalityData.bigFiveTraits.extraversion}%, 
             Agreeableness: ${personalityData.bigFiveTraits.agreeableness}%, 
             Neuroticism: ${personalityData.bigFiveTraits.neuroticism}%` : 'Not available'}
          
          ACTIVITIES:
          ${activitiesSummary}
          
          Based on this data, provide:
          1. 2-3 core beliefs that appear repeatedly in their journal entries
          2. How these beliefs might be influencing their emotional states and activities
          3. Identify any limiting beliefs that might be holding them back
          4. 2-3 reframing suggestions to transform limiting beliefs into empowering ones
          
          Format your response as a cohesive paragraph of 200-250 words that's supportive, personalized and empowering.
        `;
        break;
        
      case 'predictive':
        systemPrompt = 'You are a wellness coach with expertise in predictive analytics. You analyze patterns to forecast emotional trends and provide data-driven recommendations.';
        userPrompt = `
          As a wellness expert, analyze this user's data for the ${period} period to predict future trends and provide preventative recommendations.
          
          JOURNAL ENTRIES:
          ${journalSummary}
          
          ACTIVITIES:
          ${activitiesSummary}
          
          WELLNESS SCORES:
          ${scoresSummary}
          
          PERSONALITY DATA:
          MBTI Type: ${personalityData.mbtiType || 'Unknown'}
          Big Five Traits: 
          ${personalityData.bigFiveTraits ? 
            `Openness: ${personalityData.bigFiveTraits.openness}%, 
             Conscientiousness: ${personalityData.bigFiveTraits.conscientiousness}%, 
             Extraversion: ${personalityData.bigFiveTraits.extraversion}%, 
             Agreeableness: ${personalityData.bigFiveTraits.agreeableness}%, 
             Neuroticism: ${personalityData.bigFiveTraits.neuroticism}%` : 'Not available'}
          
          Based on this data, provide:
          1. A prediction of how their emotional and mental wellbeing might trend in the coming ${period}
          2. Identify potential triggers or situations that might cause emotional dips
          3. 3-4 specific, data-driven preventative recommendations to maintain or improve wellbeing
          4. Quantify the potential impact of your recommendations (e.g., "This could reduce stress by approximately 30%")
          
          Format your response as a cohesive paragraph of 200-250 words that's supportive, personalized and empowering.
        `;
        break;
        
      default:
        userPrompt = `
          As a wellness expert, analyze this user's data for the ${period} period and provide insights on their overall wellbeing patterns.
          
          JOURNAL ENTRIES:
          ${journalSummary}
          
          ACTIVITIES:
          ${activitiesSummary}
          
          WELLNESS SCORES:
          ${scoresSummary}
          
          Based on this data, provide:
          1. Key patterns or trends noticed during this ${period} period
          2. How their activities correlate with their mental wellness
          3. 2-3 specific, actionable recommendations to improve their wellness routine
          4. A motivational insight that acknowledges their progress
          
          Format your response as a cohesive paragraph of 200-250 words that's supportive and empowering.
        `;
    }

    // Call OpenAI API with GPT-4
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using GPT-4 for advanced analysis
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const insightText = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ 
        insight: insightText,
        period: period,
        framework: analyticalFramework
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating wellness insight:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
