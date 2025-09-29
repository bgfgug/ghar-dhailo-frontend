import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, Clock, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useSearch, usePopularSearches } from '@/hooks/use-search';
import { formatPrice } from '@/utils/formatPrice';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const { 
    query, 
    setQuery, 
    searchResults, 
    activeFilters, 
    toggleFilter, 
    clearFilters,
    isSearching,
    hasResults 
  } = useSearch();
  const { data: popularSearches } = usePopularSearches();

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    
    // Save to recent searches
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  const handleResultClick = (result: any) => {
    if (result.type === 'restaurant') {
      navigate(`/product/${result.id}`);
    } else if (result.type === 'food') {
      navigate(`/product/${result.restaurantId}`);
    } else if (result.type === 'grocery') {
      navigate('/grocery');
    }
    onOpenChange(false);
  };

  const filters = [
    { id: 'restaurant', label: 'Restaurants' },
    { id: 'food', label: 'Food Items' },
    { id: 'grocery', label: 'Groceries' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search size={20} />
            Search
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search for food, groceries, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4"
            autoFocus
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={16} className="text-gray-500" />
          {filters.map(filter => (
            <Badge
              key={filter.id}
              variant={activeFilters.includes(filter.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X size={14} />
              Clear
            </Button>
          )}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto">
          {isSearching ? (
            hasResults ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-3">
                  Found {searchResults.length} results for "{query}"
                </p>
                {searchResults.map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                      <img 
                        src={result.image} 
                        alt={result.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{result.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Badge variant="secondary" className="text-xs">
                          {result.type}
                        </Badge>
                        {result.category && (
                          <span>• {result.category}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {result.price && (
                        <p className="font-medium">{formatPrice(result.price)}</p>
                      )}
                      {result.rating && (
                        <p className="text-sm text-gray-500">★ {result.rating}</p>
                      )}
                      {result.deliveryTime && (
                        <p className="text-sm text-gray-500">{result.deliveryTime} min</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-1">Try searching with different keywords</p>
              </div>
            )
          ) : (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 font-medium mb-3">
                    <Clock size={16} />
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              {popularSearches && (
                <div>
                  <h3 className="flex items-center gap-2 font-medium mb-3">
                    <TrendingUp size={16} />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleSearch(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;