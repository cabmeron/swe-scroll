
import React, { useState } from 'react';
import { Search, Book, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BookView from '@/components/BookView';
import ThemeToggle from '@/components/ThemeToggle';

// Example book data structure
const sampleBooks = [
  {
    id: 1,
    title: "The Art of War",
    author: "Sun Tzu",
    description: "Ancient strategies for modern conflicts and business tactics",
    totalReadTime: "45 min",
    rating: 4.8,
    chapters: [
      {
        id: 1,
        title: "Laying Plans",
        summary: "The foundation of all warfare lies in deception and careful planning. Victory is achieved before the battle begins.",
        bulletPoints: [
          "War is a matter of life and death",
          "All warfare is based on deception",
          "Supreme excellence is breaking the enemy's resistance without fighting"
        ],
        quotes: [
          "If you know the enemy and know yourself, you need not fear the result of a hundred battles."
        ],
        readTime: "8 min",
        importance: 5
      },
      {
        id: 2,
        title: "Waging War",
        summary: "Swift victory is the goal. Prolonged warfare exhausts resources and weakens the state.",
        bulletPoints: [
          "Speed is the essence of war",
          "Use captured resources to fuel your campaign",
          "Avoid prolonged sieges"
        ],
        quotes: [
          "In war, the way is to avoid what is strong and to strike at what is weak."
        ],
        readTime: "7 min",
        importance: 4
      }
    ]
  },
  {
    id: 2,
    title: "Meditations",
    author: "Marcus Aurelius",
    description: "Stoic philosophy and personal reflections of a Roman Emperor",
    totalReadTime: "62 min",
    rating: 4.9,
    chapters: [
      {
        id: 1,
        title: "Book I - Debts and Lessons",
        summary: "Gratitude for the lessons learned from family, teachers, and mentors.",
        bulletPoints: [
          "Acknowledge those who shaped your character",
          "Learn from every interaction",
          "Practice humility and gratitude"
        ],
        quotes: [
          "Very little is needed to make a happy life; it is all within yourself, in your way of thinking."
        ],
        readTime: "12 min",
        importance: 4
      }
    ]
  },
  {
    id: 3,
    title: "The Prince",
    author: "Niccolò Machiavelli",
    description: "Political philosophy on leadership, power, and governance",
    totalReadTime: "38 min",
    rating: 4.6,
    chapters: [
      {
        id: 1,
        title: "The Different Kinds of Principalities",
        summary: "An overview of various types of states and how they are acquired and maintained.",
        bulletPoints: [
          "Hereditary principalities are easier to maintain",
          "New principalities face greater challenges",
          "Mixed principalities require careful management"
        ],
        quotes: [
          "It is better to be feared than loved, if you cannot be both."
        ],
        readTime: "9 min",
        importance: 5
      }
    ]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  
  const filteredBooks = sampleBooks.filter(book =>
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
            📚 Gentle Reader
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
                
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-slate-500 dark:from-blue-600 dark:to-slate-600 hover:from-blue-600 hover:to-slate-600 dark:hover:from-blue-700 dark:hover:to-slate-700 text-white font-semibold py-2 rounded-lg shadow-sm transform transition-all duration-200 group-hover:scale-105">
                  Begin Reading
                </Button>
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
