interface PostBody {
  name: string;
  description?: string;
  video?: string;
  comment?: string;
}

export function validateExerciseForm(formData: FormData) {
  let fetchData: PostBody = { name: "" };
  if(!formData.get("name")){
    return
  }
  fetchData.name = String(formData.get("name")).trim();
  if (formData.get("description")) {
    fetchData.description = String(formData.get("description")).trim();
  }
  if (formData.get("video")) {
    fetchData.video = String(formData.get("video")).trim();
  }
  if (formData.get("comment")) {
    fetchData.comment = String(formData.get("comment")).trim();
  }
  return fetchData;
}
