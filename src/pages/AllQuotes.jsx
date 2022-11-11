import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

const AllQuotes = () => {
    const { sendRequest, status, data: listOfQuotes, error } = useHttp(getAllQuotes, true);
    console.log('fn: ' + sendRequest);
    console.log('status: ' + status);
    console.log('data: ' + listOfQuotes);
    console.log('AllQuotes Render.');
    useEffect(() => {
        console.log('AllQuotes Effect Start.');
        sendRequest();
        console.log('AllQuotes Effect.');
    }, [sendRequest]);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>;
    }

    if (error) {
        return <p className='centered focus'>{ error }</p>;
    }

    if (status === 'completed' && (!listOfQuotes || listOfQuotes.length === 0)) {
        return <div className='centered'>
            <NoQuotesFound />
        </div>
    }

    return (
        <QuoteList quotes={listOfQuotes} />
    );
};

export default AllQuotes;