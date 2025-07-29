export default function Footer() {

  const today = new Date();

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center text-gray-600 text-sm">
          <span>&copy; {today.getFullYear()} Ruthenia IT Consulting</span>
        </div>
      </div>
    </footer>
  )
}