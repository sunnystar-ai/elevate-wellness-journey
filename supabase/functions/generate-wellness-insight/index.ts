
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

    const { journalEntries, activities, wellnessScores, period } = await req.json();
    
    console.log('Generating wellness insight for period:', period);
    console.log('Journal entries count:', journalEntries?.length);
    console.log('Activities count:', activities?.length);
    console.log('Wellness scores count:', wellnessScores?.length);

    // Prepare data summary for the prompt
    const journalSummary = journalEntries.map(entry => `Date: ${new Date(entry.created_at).toLocaleDateString()}, Feelings: ${entry.feelings.substring(0, 50)}...`).join('\n');
    
    const activitiesSummary = activities.map(activity => 
      `Activity: ${activity.activity_name}, Duration: ${activity.duration} ${activity.duration_unit}, Date: ${new Date(activity.activity_date).toLocaleDateString()}, Completed: ${activity.completed}`
    ).join('\n');
    
    const scoresSummary = wellnessScores.map(score => 
      `Date: ${new Date(score.score_date).toLocaleDateString()}, Mental: ${score.mental_score}, Physical: ${score.physical_score || 'N/A'}, Sleep: ${score.sleep_score || 'N/A'}, Nutrition: ${score.nutrition_score || 'N/A'}`
    ).join('\n');

    // Analyze correlation between physical activity and mental wellness
    const prompt = `
      As a wellness expert, analyze this user's data for the ${period} period and provide insights on how their physical activity affects their mental wellness.
      
      JOURNAL ENTRIES:
      ${journalSummary}
      
      ACTIVITIES:
      ${activitiesSummary}
      
      WELLNESS SCORES:
      ${scoresSummary}
      
      Based on this data, provide:
      1. A concise analysis of how consistent physical activity correlates with their mental wellness scores and journal sentiments
      2. Key patterns or trends noticed during this ${period} period
      3. 2-3 specific, actionable recommendations to improve their wellness routine
      4. A motivational insight that acknowledges their progress
      
      Format your response as a single cohesive paragraph of 150-200 words that's supportive and empowering.
    `;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a wellness coach and mental health expert providing insights based on user data.' },
          { role: 'user', content: prompt }
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
