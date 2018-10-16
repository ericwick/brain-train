UPDATE users
SET password = $2, 
    profile_pic = $3
WHERE uid = $1
RETURNING *;