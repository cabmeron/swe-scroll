
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
          i < importance ? 'text-blue-500 fill-current' : 'text-slate-300 dark:text-slate-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-slate-50 to-blue-100 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900">
      <ThemeToggle />
      
      {/* Background texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none dark:opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-slate-600 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-200 dark:hover:bg-gray-800 border border-slate-200 dark:border-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Library
          </Button>
        </div>

        {/* Book Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-850 border border-slate-200 dark:border-gray-700 shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-4xl md:text-5xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                {book.title}
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-4">
                by {book.author}
              </CardDescription>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                {book.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-slate-300">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">{book.totalReadTime} total</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 fill-current text-blue-500" />
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
          <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-200 text-center mb-8">
            Chapters & Insights
          </h2>
          
          {book.chapters.map((chapter, index) => (
            <Card key={chapter.id} className="bg-gradient-to-r from-white to-slate-50 dark:from-gray-800 dark:to-gray-850 border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-700 px-3 py-1 rounded-full mr-3">
                        Chapter {index + 1}
                      </span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-500 dark:text-slate-400">{chapter.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-2">
                      {chapter.title}
                    </CardTitle>
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300 mr-2">Importance:</span>
                      <div className="flex">
                        {getImportanceStars(chapter.importance)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedChapter === chapter.id ? (
                      <ChevronDown className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    ) : (
                      <ChevronRight className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {expandedChapter === chapter.id && (
                <CardContent className="pt-0">
                  <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
                    {/* Summary */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Summary</h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-400">
                        {chapter.summary}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Key Points</h4>
                      <ul className="space-y-2">
                        {chapter.bulletPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start">
                            <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1">•</span>
                            <span className="text-slate-600 dark:text-slate-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quotes */}
                    {chapter.quotes.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Notable Quotes</h4>
                        {chapter.quotes.map((quote, quoteIndex) => (
                          <blockquote 
                            key={quoteIndex} 
                            className="border-l-4 border-blue-500 pl-6 py-4 mb-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-750 rounded-r-lg italic text-slate-600 dark:text-slate-300 text-lg"
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
        <footer className="text-center mt-16 py-8 border-t border-slate-200 dark:border-gray-700">
          <p className="text-slate-600 dark:text-slate-400 italic">
            "The more that you read, the more things you will know. The more that you learn, the more places you'll go." - Dr. Seuss
          </p>
        </footer>
      </div>
    </div>
  );
};

export default BookView;
