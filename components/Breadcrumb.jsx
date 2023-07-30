import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "../styles/components/breadcrumb.css";

export default function Breadcrumb() {
  const location = useLocation();
  
  const productId = location.pathname.split('/')[1];
  const productName = localStorage.getItem(productId);

  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: `/${productId}`, breadcrumb: productName || 'Product' },
  ];

  const breadcrumbs = useBreadcrumbs(routes);
  console.log(breadcrumbs);

  return (
    <nav>
      {breadcrumbs.map(({ breadcrumb }, index) => (
        <Link
          key={breadcrumb.key}
          to={breadcrumb.key}
          className={
            breadcrumb.key === location.pathname ? "bc-active" : "bc-not-active"
          }
        >
          {breadcrumb.props.children} {index < breadcrumbs.length - 1 && ' / '}
        </Link>
      ))}
    </nav>
  );
}
