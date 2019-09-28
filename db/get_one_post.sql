SELECT p.id as post_id, p.title, p.img, p.content, u.id as user_id, u.username, u.profile_pic FROM posts p
JOIN users u ON p.author_id = u.id
WHERE p.id = $1;