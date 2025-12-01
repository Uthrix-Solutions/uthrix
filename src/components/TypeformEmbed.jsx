import { useEffect } from 'react';

const TypeformEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div data-tf-live="01HM8G88Y72Y70Q2SW4940DP5G"></div>
  );
};

export default TypeformEmbed;
