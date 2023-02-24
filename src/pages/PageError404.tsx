import {Link} from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <div>
        <div>
          <h1>404</h1>

          <h6>
            <span>Oops!</span> Page not found
          </h6>

          <h2>The page you’re looking for doesn’t exist.</h2>

          <Link to="/">Go home</Link>
        </div>
      </div>
    </div>
  );
}
