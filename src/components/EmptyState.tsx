
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  onAction
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <Icon size={48} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-2xl font-medium mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {(actionLabel && (actionLink || onAction)) && (
        actionLink ? (
          <Button asChild>
            <Link to={actionLink} className="inline-block">
              {actionLabel}
            </Link>
          </Button>
        ) : (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
