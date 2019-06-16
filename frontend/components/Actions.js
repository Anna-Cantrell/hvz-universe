import Link from 'next/link';
import Nav from './Nav';
import gql from 'graphql-tag';

const Actions = () => (
  <div>
    <Link href="/hvz-admin/custom-updates">
      <a><button>Add New Updates</button></a>
    </Link>
    <button>Kill a human</button><br />
    <button>Unlock a loot box</button>
  </div>
);

export default Actions;
