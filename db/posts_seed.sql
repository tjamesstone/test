DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INTEGER REFERENCES users(id)
);

INSERT INTO posts (title, img, content, author_id)
VALUES('Frogs are cool', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1xp48Z1Dt6UQvGXDkUzRIT5zJdPUPOZu8x2HSlCxdKsS3g02iw', 'I love frogs so much. They are awesome', 3),
('I also love frogs', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1xp48Z1Dt6UQvGXDkUzRIT5zJdPUPOZu8x2HSlCxdKsS3g02iw', 'What a cool pic I found on this site, Im resharing it', 1),
('Frogs are dumb', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR1xp48Z1Dt6UQvGXDkUzRIT5zJdPUPOZu8x2HSlCxdKsS3g02iw', 'I do not like frogs but I am resharing this picture', 2);

SELECT * FROM posts;