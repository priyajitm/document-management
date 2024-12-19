export const formatTimeSinceLastSave = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return 'Just now';
    }

    if (hours >= 1) {
      const remainingMinutes = minutes % 60;
      if (remainingMinutes === 0) {
        return `${hours}h ago`;
      }
      const roundedMinutes = Math.round(remainingMinutes / 15) * 15;
      return `${hours}h ${roundedMinutes}m ago`;
    }

    return `${minutes}m ago`;
  };