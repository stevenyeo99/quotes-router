import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const addQuoteHandler = (quote) => {
        console.log(quote);

        history.push('/quotes');
    }

    return (
        <QuoteForm isLoading={isLoading} onAddQuote={addQuoteHandler} />
    );
};

export default NewQuote;