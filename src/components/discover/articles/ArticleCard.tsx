
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArticleProps {
  title: string;
  content: string[];
  image: string;
  date: string;
  ingredients?: string[];
  instructions?: string[];
  servingSuggestions?: string[];
}

const ArticleCard = ({ article }: { article: ArticleProps }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          {article.title}
        </CardTitle>
        <div className="text-sm text-muted-foreground">{article.date}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-48 object-cover rounded-md" 
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            {article.content.map((paragraph, i) => (
              <p key={i} className={article.ingredients ? "font-medium text-primary" : ""}>{paragraph}</p>
            ))}
            
            {article.ingredients && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {article.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {article.instructions && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {article.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}
            
            {article.servingSuggestions && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Serving Suggestions:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {article.servingSuggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
