// FRIDAY — GitHub Collab Engine
// Reads and writes files directly to the repo as a co-pilot

const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const REPO_OWNER = 'sharaam';
const REPO_NAME = 'FRIDAY-CORE';
const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

// Read a file from the repo
async function readFile(path, branch = 'main') {
  const res = await fetch(`${BASE_URL}/contents/${path}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  const data = await res.json();
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

// Write (create or update) a file in the repo
async function writeFile(path, content, message, branch = 'main') {
  // Check if file exists to get SHA
  let sha;
  try {
    const res = await fetch(`${BASE_URL}/contents/${path}?ref=${branch}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });
    const data = await res.json();
    sha = data.sha;
  } catch (_) {}

  const body = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
    ...(sha && { sha })
  };

  const res = await fetch(`${BASE_URL}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return res.json();
}

// List files in a directory
async function listFiles(path = '', branch = 'main') {
  const res = await fetch(`${BASE_URL}/contents/${path}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  const data = await res.json();
  return data.map(f => ({ name: f.name, path: f.path, type: f.type }));
}

// Create a new branch
async function createBranch(branchName, fromBranch = 'main') {
  const refRes = await fetch(`${BASE_URL}/git/refs/heads/${fromBranch}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  const ref = await refRes.json();
  const sha = ref.object.sha;

  await fetch(`${BASE_URL}/git/refs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha })
  });
  return branchName;
}

// Get recent commits
async function getCommits(limit = 10) {
  const res = await fetch(`${BASE_URL}/commits?per_page=${limit}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  const data = await res.json();
  return data.map(c => ({
    sha: c.sha.slice(0, 7),
    message: c.commit.message,
    author: c.commit.author.name,
    date: c.commit.author.date
  }));
}

module.exports = { readFile, writeFile, listFiles, createBranch, getCommits };
