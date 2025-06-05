"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface ApiKeyFormProps {
  onApiKeySet: (key: string) => void;
  hasApiKey: boolean;
}

export default function ApiKeyForm({ onApiKeySet, hasApiKey }: ApiKeyFormProps) {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setValidationStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) return;
    
    setIsValidating(true);
    
    // Simulate API key validation
    // In a real app, you would make a test request to OpenAI API
    setTimeout(() => {
      if (apiKey.startsWith('sk-') && apiKey.length > 20) {
        setValidationStatus('success');
        // Store in localStorage
        localStorage.setItem('openai-api-key', apiKey);
        // Notify parent component
        onApiKeySet(apiKey);
        // Close dialog after a moment
        setTimeout(() => {
          setIsOpen(false);
          setIsValidating(false);
        }, 1000);
      } else {
        setValidationStatus('error');
        setIsValidating(false);
      }
    }, 1500);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('openai-api-key');
    setApiKey('');
    setValidationStatus('idle');
    onApiKeySet('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={hasApiKey ? "outline" : "default"} className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          {hasApiKey ? "Update API Key" : "Add OpenAI API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable AI-powered features. 
            Your key is stored locally in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key" className="text-left">
                API Key
              </Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  className="pr-10"
                />
                {validationStatus === 'success' && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                )}
                {validationStatus === 'error' && (
                  <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                )}
              </div>
              {validationStatus === 'error' && (
                <p className="text-sm text-red-500 mt-1">
                  Invalid API key format. It should start with "sk-" and be longer.
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Don't have an API key? Get one from the{' '}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0070CC] hover:underline"
                >
                  OpenAI dashboard
                </a>
                .
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            {hasApiKey && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearApiKey}
                className="text-red-500 hover:text-red-700"
              >
                Clear Key
              </Button>
            )}
            <Button type="submit" disabled={isValidating || !apiKey.trim()}>
              {isValidating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : validationStatus === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                'Save Key'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}