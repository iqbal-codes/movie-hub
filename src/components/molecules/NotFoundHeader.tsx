import React from 'react';
import { Film } from 'lucide-react';

const NotFoundHeader: React.FC = () => (
  <>
    <Film className="mx-auto h-24 w-24 text-blue-600" />
    <h1 className="mt-6 text-6xl font-bold text-gray-900">404</h1>
    <h2 className="mt-2 text-3xl font-medium text-gray-600">Page Not Found</h2>
  </>
);

export default NotFoundHeader;