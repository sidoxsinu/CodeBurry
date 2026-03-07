import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import defaultAvatar from '../assets/default-avatar.svg';

const socket = io('http://localhost:4000', { withCredentials: true });

interface Comment {
  user: { id: string; name: string; avatar?: string };
  content: string;
  createdAt: string;
}
interface Post {
  _id: string;
  user: { id: string; name: string; avatar?: string };
  content: string;
  likes: number;
  likedBy: string[];
  createdAt: string;
  comments?: Comment[];
  showComment?: boolean;
}

export default function Community() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/community/posts')
      .then(res => res.json())
      .then(setPosts)
      .finally(() => setLoading(false));
    socket.on('new_post', (post: Post) => setPosts(prev => [post, ...prev]));
    socket.on('like_post', ({ id, likes }: { id: string; likes: number }) => {
      setPosts(prev => prev.map(p => p._id === id ? { ...p, likes } : p));
    });
    socket.on('new_comment', ({ postId, comment }: { postId: string; comment: Comment }) => {
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p));
    });
    return () => {
      socket.off('new_post');
      socket.off('like_post');
      socket.off('new_comment');
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Community</h1>
      {isAuthenticated && (
        <form
          className="mb-6 flex flex-col gap-2 glass rounded-2xl p-6"
          onSubmit={async e => {
            e.preventDefault();
            if (!content.trim()) return;
            setError(null);
            const res = await fetch('/api/community/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ content })
            });
            if (!res.ok) {
              setError((await res.json()).message || 'Failed to post');
            } else {
              setContent('');
            }
          }}
        >
          <textarea
            className="border border-white border-opacity-20 rounded-lg p-2 w-full bg-white bg-opacity-20 text-gray-900 placeholder-gray-700 placeholder-opacity-70"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share something with the community..."
            rows={3}
          />
          <button type="submit" className="bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 px-4 py-2 rounded-lg self-end font-medium hover:from-green-300 hover:to-emerald-300 transition-all">Post</button>
          {error && <div className="text-red-800">{error}</div>}
        </form>
      )}
      {loading ? (
        <div className="text-gray-900">Loading...</div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post._id} className="glass rounded-lg shadow p-4 flex gap-4 items-start">
              <img
                src={post.user.avatar || defaultAvatar}
                alt={post.user.name}
                className="h-10 w-10 rounded-full"
                onError={e => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== window.location.origin + defaultAvatar) {
                    target.onerror = null;
                    target.src = defaultAvatar;
                  }
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{post.user.name}</span>
                  <span className="text-xs text-white text-opacity-70">{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <div className="my-2 text-white text-opacity-90">{post.content}</div>
                <button
                  className={`relative text-cyan-700 hover:text-cyan-900 text-sm font-semibold flex items-center gap-1 transition-all duration-150 ${!isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => {
                    if (!isAuthenticated || post.likedBy.includes(user?.id || '')) return;
                    fetch(`/api/community/posts/${post._id}/like`, {
                      method: 'POST',
                      credentials: 'include',
                    });
                  }}
                  disabled={!isAuthenticated || post.likedBy.includes(user?.id || '')}
                  style={{ outline: 'none' }}
                >
                  <span className="inline-block transition-transform duration-200 group-active:scale-125">❤</span>
                  <span>{post.likes}</span>
                  <span className="ml-1">Like{post.likes !== 1 ? 's' : ''}</span>
                </button>
                {/* Comment Option */}
                <button
                  className="ml-4 text-white text-opacity-60 hover:text-green-300 text-sm flex items-center gap-1"
                  onClick={() => setPosts(prev => prev.map(p => p._id === post._id ? { ...p, showComment: !p.showComment } : p))}
                >
                  💬 Comment
                </button>
                {post.showComment && (
                  <CommentForm
                    postId={post._id}
                    onComment={comment => setPosts(prev => prev.map(p => p._id === post._id ? { ...p, comments: [...(p.comments || []), comment] } : p))}
                  />
                )}
                {/* Show comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {post.comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm bg-white bg-opacity-10 rounded p-2">
                        <img
                          src={c.user.avatar || defaultAvatar}
                          alt={c.user.name}
                          className="h-7 w-7 rounded-full"
                          onError={e => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.src !== window.location.origin + defaultAvatar) {
                              target.onerror = null;
                              target.src = defaultAvatar;
                            }
                          }}
                        />
                        <div>
                          <span className="font-semibold text-white">{c.user.name}</span>{' '}
                          <span className="text-white text-opacity-60">{new Date(c.createdAt).toLocaleString()}</span>
                          <div className="text-white text-opacity-80">{c.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Comment form component
function CommentForm({ postId, onComment }: { postId: string; onComment: (comment: any) => void }) {
  const { isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/community/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: comment })
    });
    if (!res.ok) {
      setError((await res.json()).message || 'Failed to comment');
    } else {
      const data = await res.json();
      onComment(data.comment);
      setComment('');
    }
    setLoading(false);
  };

  return (
    <form className="mt-2 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 border border-white border-opacity-20 rounded px-2 py-1 text-sm bg-white bg-opacity-20 text-gray-900 placeholder-gray-700 placeholder-opacity-70"
        placeholder="Write a comment..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        disabled={!isAuthenticated || loading}
      />
      <button type="submit" className="bg-green-500 bg-opacity-70 text-gray-900 px-3 py-1 rounded disabled:opacity-50 hover:bg-opacity-80 transition-all font-medium" disabled={!isAuthenticated || loading || !comment.trim()}>
        Post
      </button>
      {error && <div className="text-red-800 ml-2">{error}</div>}
    </form>
  );
}