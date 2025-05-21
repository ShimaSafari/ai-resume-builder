// import axios from "axios";

// const API-KEY = import.meta.env.VITE-STRAPI-API-KEY;

// const axiosClient = axios.create({
//   baseURL: "http://localhost:1337/api/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${API-KEY}`,
//   },
// });

// const CreateNewResume = (data) => axiosClient.post("/user-resumes", data);

// const GetUserResumes = (userEmail) =>
//   axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

// const UpdateResumeDetail = (id, data) =>
//   axiosClient.put("/user-resumes/" + id, data);

// const GetResumeById = (id) =>
//   axiosClient.get("/user-resumes/" + id + "?populate=*");

// const DeleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);
// export default {
//   CreateNewResume,
//   GetUserResumes,
//   UpdateResumeDetail,
//   GetResumeById,
//   DeleteResumeById
// };
