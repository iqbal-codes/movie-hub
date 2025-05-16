import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Home } from 'lucide-react';
import Button from '../components/atoms/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <Film className="mx-auto h-24 w-24 text-blue-600" />
        <h1 className="mt-6 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-3xl font-medium text-gray-600">Page Not Found</h2>
        <p className="mt-4 text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Button
            onClick={() => navigate('/')}
            startIcon={<Home size={18} />}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;