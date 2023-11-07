
const BASE_URL = 'https://votex.stagingengine.com';
const apiKey = 'a1a5d500-5968-323c-396e-6592cfc9e42e';
// import AsyncStorage from '@react-native-community/async-storage';
// import DeviceInfo from 'react-native-device-info';
//const BASE_URL = "http://localhost:3000"


export const Authenticate = (username,password) => {
  console.log(username, password)
  const formdata = new FormData();
  formdata.append('username', "votexuser");
  formdata.append('password', "password");
  console.log(formdata)
  return fetch(`${BASE_URL}/api/v1/authenticate?username=${username}&password=${password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'apikey': apiKey
    },
    body: formdata
  }).then(res => res.json());
};

export const SearchCNIC = (token,cnic) => {
  return fetch(`${BASE_URL}/api/v1/search?cnic=${cnic}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'apikey': apiKey,
        'apitoken': token
      },
      
    }).then(res => res.json());

}
export const GetPdf = (token,cnic,single) => {
  console.log(`${BASE_URL}/api/v1/pdf?cnic=${cnic}&single=${single}`)
  return fetch(`${BASE_URL}/api/v1/pdf?cnic=${cnic}&single=${single}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
        'apikey': apiKey,
        'apitoken': token
      },
      
    }).then(res => res.json());

}


//   const formdata = new FormData();
//   formdata.append('resultId', resultId);
//   let tempArray = JSON.stringify(answersArray)
//   let temp = tempArray.replace(/\\/g, "")
//   formdata.append('answers', temp);
//   formdata.append('time', time);
//   console.log(formdata)
//   console.log(`${BASE_URL}/api/v1/practice/conclude`)
//   return fetch(
//     `${BASE_URL}/api/v1/practice/conclude`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'apikey': apiKey,
//         'apitoken': token
//       },
//       body: formdata
//     }).then(res => res.json());

// }

// export const getAllCourses = (token) => {
//   console.log(`${BASE_URL}/api/v1/class/courses`)
//   return fetch(
//     `${BASE_URL}/api/v1/class/courses`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const getAllContacts = (token) => {
//     console.log("bere ","cate")
//   console.log(`${BASE_URL}/api/v1/chat/contacts`)
//   return fetch(
//     `${BASE_URL}/api/v1/chat/contacts`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }


// export const getAllConversation = (token,receiver_id) => {

// console.log(`${BASE_URL}/api/v1/chat/?receiver_id=${receiver_id}`)
// return fetch(
//   `${BASE_URL}/api/v1/chat/?receiver_id=${receiver_id}`,
//   {
//     method: 'GET',
//     headers: {
//       'apikey': apiKey,
//       'apitoken': token
//     },
//   },
// ).then(res => res.json());
// }
// export const GetLeaderboard = (token, course_id, page) => {
    
//   return fetch(
//     `${BASE_URL}/api/v1/leaderboard?course_id=${course_id}&page_id=${page}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());

// }

// export const GetNotificationDetail = (token,id) => {
    
//   return fetch(
//     `${BASE_URL}/api/v1/announcements/detail?announcement_id=${id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());

// }
// export const GetAllNotification = (token) => {
//  console.log( `${BASE_URL}/api/v1/announcements/all`)
//   return fetch(
//     `${BASE_URL}/api/v1/announcements/all`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());

// }
// export const GetReport = (token, course_id) => {
//   console.log(`${BASE_URL}/api/v1/reports?course_id=${course_id}`)
//   return fetch(
//     `${BASE_URL}/api/v1/reports?course_id=${course_id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());

// }
// export const GetQuizResult = (token, resultId) => {
//    console.log(`${BASE_URL}/api/v1/quiz/result?result_id=${resultId}`);
//   console.log(`${BASE_URL}/api/v1/quiz/result?result_id=${resultId}`)
//   return fetch(
//     `${BASE_URL}/api/v1/quiz/result?result_id=${resultId}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());

// }
// export const ReviewQuiz = (token, resultId) => {
//   console.log(`${BASE_URL}/api/v1/quiz/review?result_id=${resultId}`)
//   return fetch(
//     `${BASE_URL}/api/v1/quiz/review?result_id=${resultId}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());

// }

// export const ReviewPracticMaterial = (token, resultId) => {
//   console.log(`${BASE_URL}/api/v1/practice/review?result_id=${resultId}`)
//   return fetch(
//     `${BASE_URL}/api/v1/practice/review?result_id=${resultId}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());

// }
// export const getCourseDetail = (token, id) => {
//   return fetch(
//     `${BASE_URL}/api/v1/course/details?course_id=` + id,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const LessonDetail = (token,lesson_id, section_id) => {
//   return fetch(
//     `${BASE_URL}/api/v1/course//lesson?lesson_id=${lesson_id}&section_id=${section_id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const getAllQuizes = (token) => {
//   return fetch(
//     `${BASE_URL}/api/v1/quiz/all`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());
// }
// export const getAllPracticeMaterials = (token) => {
//   return fetch(
//     `${BASE_URL}/api/v1/practice/all`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());
// }


// export const StartPracticeMaterials = (token, course_id, quiz_id) => {
//   console.log(`${BASE_URL}/api/v1/practice/start?course_id=${course_id}&quiz_id=${quiz_id}`)
//   return fetch(
//     `${BASE_URL}/api/v1/practice/start?course_id=${course_id}&quiz_id=${quiz_id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const StartQuiz = (token, course_id, quiz_id) => {
//   console.log(`${BASE_URL}/api/v1/quiz/start?course_id=${course_id}&quiz_id=${quiz_id}`)
//   return fetch(
//     `${BASE_URL}/api/v1/quiz/start?course_id=${course_id}&quiz_id=${quiz_id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const QuizDetails = (token, course_id, quiz_id) => {
//   console.log(`${BASE_URL}/api/v1/quiz/quiz?course_id=${course_id}&quiz_id=${quiz_id}`)
//   return fetch(
//     `${BASE_URL}/api/v1/quiz/quiz?course_id=${course_id}&quiz_id=${quiz_id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }
// export const PraticMatrialQuiz = (token, course_id, quiz_id) => {
//   return fetch(
//     `${BASE_URL}/api/v1/practice/quiz?course_id=${course_id}&quiz_id=${quiz_id}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// ///get All Score ......///

// export const Getscore = (token) => {
//   return fetch(
//     `${BASE_URL}/api/v1/score/total`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const GetCalendar = (token) => {
//   return fetch(
//     `${BASE_URL}/api/v1/class/calendar`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token

//       },
//     },
//   ).then(res => res.json());
// }

// export const DownloadPdf = (token, resultId) => {
//   return fetch(
//     `${BASE_URL}/api/v1/quiz/pdf?result_id=${resultId}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());
// }


// export const DownloadPraticQuizPdf = (token, resultId) => {
//   return fetch(
//     `${BASE_URL}/api/v1/practice/pdf?result_id=${resultId}`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());
// }


// export const GetAllFeedBack = (token) => {
//   return fetch(
//     `${BASE_URL}/api/v1/feedback/all`,
//     {
//       method: 'GET',
//       headers: {
//         'apikey': apiKey,
//         'apitoken': token
//       },
//     },
//   ).then(res => res.json());
// }
// export const SubmitCourses = (email, password, deviceId, phone) => {
//   console.log(deviceId, phone)
//   const formdata = new FormData();
//   formdata.append('username', email);
//   formdata.append('password', password);
//   return fetch(
//     `${BASE_URL}/api/v1/feedback/submit/course`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'apikey': apiKey,
//         'apitoken': token
//       },
//       body: formdata
//     }).then(res => res.json());

// }

// export const SubmitManagementFeedback = (token, feedback_entry_id, feedback_setup_id, id, management_rating, suggestion) => {
//   const formdata = new FormData();
//   formdata.append('feedback_entry_id', feedback_entry_id);
//   formdata.append('feedback_setup_id', feedback_setup_id);
//   formdata.append('id', id);
//   formdata.append('management_rating', JSON.stringify(management_rating));
//   formdata.append('suggestion', suggestion);
//   console.log(formdata)
//   return fetch(
//     `${BASE_URL}/api/v1/feedback/submit/management`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'apikey': apiKey,
//         'apitoken': token
//       },
//       body: formdata
//     }).then(res => res.json());
// }


// export const SubmitDLPFeedback = (token, feedback_entry_id, feedback_setup_id, id, dlp_rating, suggestion) => {
//   const formdata = new FormData();
//   formdata.append('feedback_entry_id', feedback_entry_id);
//   formdata.append('feedback_setup_id', feedback_setup_id);
//   formdata.append('id', id);
//   formdata.append('dlp_rating', JSON.stringify(dlp_rating));
//   formdata.append('suggestion', suggestion);
//   console.log(formdata)
//   return fetch(
//     `${BASE_URL}/api/v1/feedback/submit/dlp`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'apikey': apiKey,
//         'apitoken': token
//       },
//       body: formdata
//     }).then(res => res.json());
// }



// export const SubmitCourse = (token, feedback_entry_id, feedback_setup_id, course_id, id, course_rating) => {
//   const formdata = new FormData();
//   formdata.append('feedback_entry_id', feedback_entry_id);
//   formdata.append('feedback_setup_id', feedback_setup_id);
//   formdata.append('course_id', course_id);
//   formdata.append('id', id);
//   formdata.append('course_rating', JSON.stringify(course_rating));
//   console.log(formdata)
//   return fetch(
//     `${BASE_URL}/api/v1/feedback/submit/course`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'apikey': apiKey,
//         'apitoken': token
//       },
//       body: formdata
//     }).then(res => res.json());

// }

// export const SubmitGenFeedback = (token, feedback_entry_id, feedback_setup_id, best_course_id, suggestion) => {
//   const formdata = new FormData();
//   formdata.append('feedback_entry_id', feedback_entry_id);
//   formdata.append('feedback_setup_id', feedback_setup_id);
//   formdata.append('best_course_id', best_course_id);
//   formdata.append('course_suggestion', suggestion);
//   console.log(formdata)
//   return fetch(
//     `${BASE_URL}/api/v1/feedback/submit/general`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'apikey': apiKey,
//         'apitoken': token
//       },
//       body: formdata
//     }).then(res => res.json());

// }



// export const setToken = async (token, userId, user) => {
//   await AsyncStorage.setItem('token', token);
//   await AsyncStorage.setItem('userId', userId);
//   await AsyncStorage.setItem("user", JSON.stringify(user))

//   console.log(id)
// };





