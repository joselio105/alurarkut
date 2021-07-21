import nookies from "nookies";

export default function logout(props){
    return '()';
  }

  export function getServerSideProps(context){
    nookies.destroy(context, 'USER_TOKEN');
  
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }