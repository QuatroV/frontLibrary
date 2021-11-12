import { addNewBook, deleteBook, getBook, updateBookInfo } from "../bookAPI";

test("test CRUD for book", async () => {
  const file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });
  const { newBook } = await addNewBook(
    "testTitle",
    "testAuthor",
    "testDescription",
    "testAnnotation",
    file
  );
  expect(newBook.title).toBe("testTitle");
  expect(newBook.author).toBe("testAuthor");
  expect(newBook.id).toBeTruthy();
  expect(newBook.annotation).toBeTruthy();
  expect(newBook.description).toBeTruthy();

  const { bookInfo } = await getBook(newBook.id);
  expect(bookInfo[0].title).toBe("testTitle");
  expect(bookInfo[0].author).toBe("testAuthor");
  expect(bookInfo[0].id).toBeTruthy();
  expect(bookInfo[0].annotation).toBeTruthy();
  expect(bookInfo[0].description).toBeTruthy();

  const { success } = await updateBookInfo(
    newBook.id,
    "updatedTitle",
    "updatedAuthor",
    "updatedDescription",
    "updateAnnotation"
  );
  expect(success).toBe(true);

  const { bookInfo: updatedBookInfo } = await getBook(newBook.id);
  expect(updatedBookInfo[0].title).toBe("updatedTitle");
  expect(updatedBookInfo[0].author).toBe("updatedAuthor");
  expect(updatedBookInfo[0].id).toBeTruthy();
  expect(updatedBookInfo[0].annotation).toBeTruthy();
  expect(updatedBookInfo[0].description).toBeTruthy();

  const { message } = await deleteBook(newBook.id);
  expect(message).toBe(`Книга с ID ${newBook.id} успешно удалена`);
});
