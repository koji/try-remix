import { useTransition, useActionData, Form, redirect } from "remix";
import { createPost } from "~/post";
import type { ActionFunction } from "remix";
import invariant from "tiny-invariant";

type Errors = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: Errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

const NewPost = () => {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title && <em>Title is required</em>}{" "}
          <input type="text" name="title" />{" "}
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug && <em>Slug is required</em>}{" "}
          <input type="text" name="slug" />{" "}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea rows={20} cols={100} name="markdown" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
};

export default NewPost;
