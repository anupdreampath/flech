import { BlogEditor } from "../BlogEditor";

export default function NewBlog() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold mb-6">New Post</h1>
      <BlogEditor
        initial={{
          title: "",
          slug: "",
          excerpt: "",
          cover_image: "",
          content: "",
          author: "Flech Team",
          tags: "",
          published: false,
        }}
      />
    </div>
  );
}
