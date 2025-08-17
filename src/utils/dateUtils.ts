import {format, formatDistanceToNow, isToday, isYesterday} from 'date-fns';

/**
 * Format a date for display in the Chat UI
 * @param dateString Date string to format
 * @returns Formatted date string
 */
export const formatChatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);

        if (isToday(date)) {
            return format(date, 'h:mm a'); // Today: 3:45 PM
        } else if (isYesterday(date)) {
            return 'Yesterday'; // Yesterday
        } else {
            return format(date, 'MMM d'); // Jan 15
        }
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
};

/**
 * Format a date as a relative time (e.g., "5 minutes ago")
 * @param dateString Date string to format
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (dateString: string): string => {
    try {
        return formatDistanceToNow(new Date(dateString), {addSuffix: true});
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return '';
    }
};

/**
 * Format a time for display in message bubbles
 * @param dateString Date string to format
 * @returns Formatted time string
 */
export const formatMessageTime = (dateString: string): string => {
    try {
        return format(new Date(dateString), 'h:mm a');
    } catch (error) {
        console.error('Error formatting message time:', error);
        return '';
    }
};