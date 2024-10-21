import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/* eslint-disable security/detect-object-injection */

export const capitalize = (str: string) => {
  return (
    (str ?? '').trim().charAt(0).toUpperCase() + str.substring(1)
  ).replaceAll('_', ' ');
};

export function capitalizeSentence(
  sentence: string,
  ignoreWords = ['for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'a', 'an'],
) {
  // Split the sentence into words

  const words = sentence.split(' ');
  // Capitalize the first letter of each word, ignoring specified words

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check if the word should be ignored
    if (!ignoreWords.includes(word.toLowerCase())) {
      // Capitalize the first letter
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  // Join the words back into a sentence
  return words.join(' ');
}

export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';

  if (typeof text !== 'string') return text;
  return text
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => {
      if (
        word &&
        word.toLowerCase() !== 'and' &&
        word[0] === word[0].toLowerCase()
      ) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(' ');
};
