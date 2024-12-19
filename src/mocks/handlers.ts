import { http, HttpResponse, delay, ResponseResolver } from "msw";
import { db } from "./db";
import { Document } from "../types/document";

const ARTIFICIAL_DELAY_MS = 2000;

const handleRequest = async (
  operation: () =>
    | Promise<Document | Document[] | Partial<Document> | null>
    | Document
    | Document[]
    | Partial<Document>
    | null,
  errorStatus = 400
): Promise<HttpResponse> => {
  await delay(ARTIFICIAL_DELAY_MS);
  try {
    const result = await operation();
    return HttpResponse.json(result);
  } catch (error) {
    console.error(error);
    return new HttpResponse(null, { status: errorStatus });
  }
};

const getAllDocuments = async () => {
  return handleRequest(() => db.getAllDocuments());
};

const getDocument = async ({ params }: { params: { type: string } }) => {
  return handleRequest(() => {
    const document = db.getDocument(params.type);
    if (!document) throw new Error("Document not found");
    return document;
  }, 404);
};

const createDocument = async ({ request }: { request: Request }) => {
  return handleRequest(async () => {
    const newDocument = (await request.json()) as Omit<Document, "position">;
    return db.createDocument(newDocument);
  }, 201);
};

const updateDocument = async ({
  params,
  request,
}: Parameters<ResponseResolver>[0]) => {
  const { type } = params as { type: string };
  return handleRequest(async () => {
    const update = (await request.json()) as Partial<Document>;
    return db.updateDocument(type, update);
  }, 404);
};

const deleteDocument = async ({ params }: { params: { type: string } }) => {
  return handleRequest(() => {
    db.deleteDocument(params.type);
    return HttpResponse.json(null, { status: 204 });
  }, 404);
};

const updateMultipleDocuments = async ({ request }: { request: Request }) => {
  return handleRequest(async () => {
    const documents = (await request.json()) as Document[];
    return db.updateDocuments(documents);
  });
};

export const handlers = [
  http.get("/api/documents", getAllDocuments),
  http.get("/api/documents/:type", getDocument),
  http.post("/api/documents", createDocument),
  http.put("/api/documents/:type", updateDocument),
  http.delete("/api/documents/:type", deleteDocument),
  http.put("/api/documents", updateMultipleDocuments),
];
