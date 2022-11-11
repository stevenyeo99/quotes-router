import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments.js';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!'},
    { id: 'q2', author: 'Steven', text: 'Milestone to master react!'}
];

const QuoteDetail = () => {
    const params = useParams();
    const match = useRouteMatch();

    console.log(match);

    const quote = DUMMY_QUOTES.find(quote => {
        return quote.id === params.quoteId
    });

    if (!quote) {
        return <p>No Quote Found.</p>;
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