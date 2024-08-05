export const useGetUser = () => {
  const { name, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, profilePhoto, userID, isAuth };
};
