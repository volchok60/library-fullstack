import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { booksCount, availableBooksCount, authorsCount, genresCount } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const [counts, setCounts] = useState({
    books: -1,
    availableBooks: -1,
    authors: -1,
    genres: -1
  })

  const {isPending: bcLoading, error: bcError, data: bc, isFetching } = useQuery<string | null, Error>({
    queryKey: ['books-count'],
    queryFn: () => booksCount()
  });

  const {isPending: abcLoading, error: abcError, data: abc } = useQuery<string | null, Error>({
    queryKey: ['available-books-count'],
    queryFn: () => availableBooksCount()
  });

  const {isPending: acLoading, error: acError, data: ac } = useQuery<string | null, Error>({
    queryKey: ['authors-count'],
    queryFn: () => authorsCount()
  });

  const {isPending: gcLoading, error: gcError, data: gc } = useQuery<string | null, Error>({
    queryKey: ['genres-count'],
    queryFn: () => genresCount()
  });

  useEffect(() => {
    if (bc && abc && ac && gc) {
        setCounts({
          books: parseInt(bc || '0'),
          availableBooks: parseInt(abc || '0'),
          authors: parseInt(ac || '0'),
          genres: parseInt(gc || '0')
        })
    }
  }, [bc, abc, ac, gc])  

  const stats = [
    {
      title: 'Books',
      count: counts.books,
      icon: '📚',
      color: 'from-blue-500 to-blue-600',
      link: '/books',
      description: 'Total books in collection'
    },
    {
      title: 'Authors',
      count: counts.authors,
      icon: '✍️',
      color: 'from-purple-500 to-purple-600',
      link: '/authors',
      description: 'Featured authors'
    },
    {
      title: 'Genres',
      count: counts.genres,
      icon: '🏷️',
      color: 'from-green-500 to-green-600',
      link: '/genres',
      description: 'Book categories'
    },
    {
      title: 'Available',
      count: counts.availableBooks,
      icon: '✅',
      color: 'from-emerald-500 to-emerald-600',
      link: '/books/available',
      description: 'Ready to borrow'
    }
  ]

  if (bcError) return <div>Error fetching books count: {bcError.message}</div>;
  if (abcError) return <div>Error fetching available books count: {abcError.message}</div>;
  if (acError) return <div>Error fetching authors count: {acError.message}</div>;
  if (gcError) return <div>Error fetching genres count: {gcError.message}</div>;
  
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Library
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our collection, manage books, and discover new literary adventures 
            with our comprehensive library management system.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-white opacity-10">
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white opacity-20"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white opacity-20"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        {(bcLoading || acLoading || gcLoading || abcLoading) ? (
                          <div className="animate-pulse bg-white bg-opacity-30 rounded h-8 w-12"></div>
                        ) : (
                          stat.count
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
                  <p className="text-sm opacity-90">{stat.description}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Add New Book', link: '/books/create', icon: '➕', color: 'bg-blue-500 hover:bg-blue-600' },
              { title: 'Add Author', link: '/authors/create', icon: '👤', color: 'bg-purple-500 hover:bg-purple-600' },
              { title: 'Add Genre', link: '/genres/create', icon: '🏷️', color: 'bg-green-500 hover:bg-green-600' },
            ].map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className={`${action.color} text-white rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="font-semibold">{action.title}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Library Analytics</h3>
            <p className="text-gray-600">
              Track your library's performance with detailed statistics and insights about your collection.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Search</h3>
            <p className="text-gray-600">
              Quickly find books, authors, and genres with our intuitive search and filtering system.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Updates</h3>
            <p className="text-gray-600">
              Keep track of book availability and due dates with real-time status updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}