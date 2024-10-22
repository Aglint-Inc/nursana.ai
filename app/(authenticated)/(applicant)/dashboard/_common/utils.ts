export const getErrorMessage = (
  error:
    | 'SYSTEM_ERROR'
    | 'UNSUPPORTED_FORMAT'
    | 'AI_ERROR'
    | 'DB_ERROR'
    | 'PARSING_ERROR',
) => {
  if (typeof error === 'string') {
    switch (error) {
      case 'SYSTEM_ERROR':
        return 'We encountered a system error. Please try again later.';
      case 'UNSUPPORTED_FORMAT':
        return 'The uploaded file format is not supported. Please upload a PDF or Word document.';
      case 'AI_ERROR':
        return 'There was an issue processing your resume. Please try uploading it again.';
      case 'DB_ERROR':
        return 'We had trouble saving your information. Please try again.';
      case 'PARSING_ERROR':
        return "We couldn't read your resume properly. Please ensure it's a clear, text-based document and try again.";
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  } else if (typeof error === 'object') {
    return (error as Error).message;
  }
  return 'There was an issue with your resume. Please try uploading it again.';
};
