import { gql, useQuery } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    getCustomers {
      name
      value {
        email
        name
      }
    }
  }
`;


// function ComponentName() {
//   const { loading, error, data } = useQuery(GET_QUERY);

//   if (loading) return <p>Loading ...</p>;

//   if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

//   return <pre>{JSON.stringify(data, null, 2)}</pre>;
// }

// export default ComponentName;
