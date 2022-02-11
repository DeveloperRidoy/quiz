import { GetServerSideProps } from "next";
import { useStateContext } from "../hoc/context/StateContext";
import authenticateUser from "../utils/server/authenticateUser";

const AccountPage = () => {
 
  const { state: { auth: { user } } } = useStateContext();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      {user?.photo ? (
        <img
          src={user.photo}
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
      ) : (
        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
      )}
      <div className="grid gap-3 rounded border border-gray-300 bg-white p-5  ">
        <p>
          <span className="font-semibold">Name: </span>
          <span>{user?.name}</span>
        </p>
        <p>
          <span className="font-semibold">Email: </span>
          <span>{user?.email}</span>
        </p>
        <p>
          <span className="font-semibold">Role: </span>
          <span>{user?.role}</span>
        </p>
      </div>
    </div>
  )
};

export default AccountPage;


export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const user = await authenticateUser(req);
  
  if (!user) return {
    redirect: {
      destination: '/login', 
      permanent: false
    }
  }

  return {
    props: {
      ssr: true,
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}