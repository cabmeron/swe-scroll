
import React, { useState } from 'react';
import { Search, Book, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { books } from '@/lib/books';
import BookView from '@/components/BookView';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedBook) {
    return <BookView book={selectedBook} onBack={() => setSelectedBook(null)} />;
  }

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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-700 dark:text-slate-200 mb-4 drop-shadow-sm">
            📚 swe scroll
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 italic">
            "Wisdom flows gently like a quiet stream"
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-slate-400 dark:from-blue-400 dark:to-slate-500 mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search wisdom... (title, author, or topic)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-slate-200 dark:border-gray-700 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:border-blue-300 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-400/20 shadow-sm text-slate-700 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <Card 
              key={book.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-850 border border-slate-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
              onClick={() => setSelectedBook(book)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Book className="h-8 w-8 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <Star className="h-4 w-4 fill-current mr-1 text-blue-400" />
                    <span className="text-sm font-medium">{book.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  {book.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 font-medium">
                  by {book.author}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{book.totalReadTime}</span>
                  </div>
                  <span className="font-medium">
                    {book.chapters.length} chapter{book.chapters.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <Book className="h-24 w-24 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-2">No books found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Your search for "{searchTerm}" yielded no results. Try different terms.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t border-slate-200 dark:border-gray-700">
          <p className="text-slate-600 dark:text-slate-400 italic">
            "A room without books is like a body without a soul" - Cicero
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
