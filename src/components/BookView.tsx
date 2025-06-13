import React, { useState } from 'react';
import { ArrowLeft, Clock, Star, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from './ThemeToggle';

interface Chapter {
  id: number;
  title: string;
  summary: string;
  bulletPoints: string[];
  quotes: string[];
  readTime: string;
  importance: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  totalReadTime: string;
  rating: number;
  chapters: Chapter[];
}

interface BookViewProps {
  book: Book;
  onBack: () => void;
}

const BookView: React.FC<BookViewProps> = ({ book, onBack }) => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const getImportanceStars = (importance: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < importance ? 'text-amber-500 fill-current' : 'text-amber-300 dark:text-amber-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      <ThemeToggle />
      
      {/* Background texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-amber-700 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300 dark:hover:text-amber-100 dark:hover:bg-gray-800 border-2 border-amber-300 dark:border-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>
        </div>

        {/* Book Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-300 dark:border-gray-700 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-200 mb-2">
                {book.title}
              </CardTitle>
              <CardDescription className="text-xl text-amber-700 dark:text-amber-300 font-medium mb-4">
                by {book.author}
              </CardDescription>
              <p className="text-lg text-amber-800 dark:text-amber-300 mb-6 max-w-2xl mx-auto">
                {book.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-amber-700 dark:text-amber-300">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">{book.totalReadTime} total</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-current text-amber-500" />
                  <span className="font-medium">{book.rating}/5</span>
                </div>
                <div className="font-medium">
                  {book.chapters.length} chapter{book.chapters.length > 1 ? 's' : ''}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Chapters */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-200 text-center mb-8">
            Chapters & Insights
          </h2>
          
          {book.chapters.map((chapter, index) => (
            <Card key={chapter.id} className="bg-gradient-to-r from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 border-2 border-amber-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-gray-700 px-3 py-1 rounded-full mr-3">
                        Chapter {index + 1}
                      </span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-600 dark:text-amber-400">{chapter.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-amber-900 dark:text-amber-200 mb-2">
                      {chapter.title}
                    </CardTitle>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-amber-700 dark:text-amber-300 mr-2">Importance:</span>
                      <div className="flex">
                        {getImportanceStars(chapter.importance)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedChapter === chapter.id ? (
                      <ChevronDown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {expandedChapter === chapter.id && (
                <CardContent className="pt-0">
                  <div className="border-t border-amber-200 dark:border-gray-700 pt-6">
                    {/* Summary */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-3">Summary</h4>
                      <p className="text-amber-800 dark:text-amber-300 leading-relaxed bg-amber-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-amber-400">
                        {chapter.summary}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-3">Key Points</h4>
                      <ul className="space-y-2">
                        {chapter.bulletPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start">
                            <span className="text-amber-600 dark:text-amber-400 mr-3 mt-1">•</span>
                            <span className="text-amber-800 dark:text-amber-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quotes */}
                    {chapter.quotes.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-200 mb-3">Notable Quotes</h4>
                        {chapter.quotes.map((quote, quoteIndex) => (
                          <blockquote 
                            key={quoteIndex} 
                            className="border-l-4 border-amber-500 pl-6 py-4 mb-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-r-lg italic text-amber-800 dark:text-amber-300 text-lg"
                          >
                            "{quote}"
                          </blockquote>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t border-amber-300 dark:border-gray-700">
          <p className="text-amber-700 dark:text-amber-400 italic">
            "The more that you read, the more things you will know. The more that you learn, the more places you'll go." - Dr. Seuss
          </p>
        </footer>
      </div>
    </div>
  );
};

export default BookView;
