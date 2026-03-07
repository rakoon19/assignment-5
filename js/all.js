// now i need to make cards and using api need to insert it in the cards id div
const URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const fetchingData = async () => {
    const response = await fetch(URL);
    const convertTOjson = await response.json();
    const data = convertTOjson;
    useData(data);
}
const useData = (d) => {
    // need to change cards numbah in the status dynamically
    const lenofCards = document.getElementById('lenofCards');
    lenofCards.innerText = d.data.length;

    

}
fetchingData();

// {
//   "status": "success",
//   "message": "Issue fetched successfully",
//   "data": {
//     "id": 33,
//     "title": "Add bulk operations support",
//     "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
//     "status": "open",
//     "labels": [
//       "enhancement"
//     ],
//     "priority": "low",
//     "author": "bulk_barry",
//     "assignee": "",
//     "createdAt": "2024-02-02T10:00:00Z",
//     "updatedAt": "2024-02-02T10:00:00Z"
//   }
// }


// gotta function all the btns to work

// need to work with the search option

// have to work with modals

// new issue btn optional i think