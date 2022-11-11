import { useEffect } from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound.js';
import LoadingSpinner from '../components/UI/LoadingSpinner.js';

import useHttp from '../hooks/use-http.js';
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
    const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);

    const params = useParams();
    const match = useRouteMatch();

    const {quoteId} = params;

    useEffect(() => {
        if (status !== 'completed') {
            sendRequest(quoteId);
        }
    }, [sendRequest, status, quoteId]);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>;
    }

    if (error) {
        return <p className='centered focus'>{ error }</p>;
    }

    if (status === 'completed' && !quote.text) {
        return <p>No quote found!</p>;
    }

    return (
        <div>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path='/quotes/:quoteId' exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Display Comment</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </div>
    );
};

export default QuoteDetail;