// Supabase Storage Service (PDFs, thumbnails, assignments, certificates)
const { createClient } = require("@supabase/supabase-js");

// TODO: Initialize Supabase client
const supabase = null;
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const uploadFile = async (bucket, path, file, mimeType) => {
  // TODO: supabase.storage.from(bucket).upload(path, file, { contentType: mimeType })
  // TODO: return public URL
};

const deleteFile = async (bucket, path) => {
  // TODO: supabase.storage.from(bucket).remove([path])
};

const getPublicUrl = (bucket, path) => {
  // TODO: return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
};

module.exports = { uploadFile, deleteFile, getPublicUrl };
