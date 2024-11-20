import axios from "axios";

const baseUrl = "/persons";

const addContact = (contact) => {
  return axios.post(baseUrl, contact).then((response) => response.data);
};

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const updateNumber = (id, changedContact) => {
    return axios.put(`${baseUrl}/${id}`, changedContact).then(response => response.data)
}

export default { addContact, getAll, deleteContact, updateNumber };
