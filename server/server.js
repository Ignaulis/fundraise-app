import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3001;
const url = '/api/v1/';
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fond'
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.json())
app.use(cookieParser());



app.get(url + 'fond', (req, res) => {

    const sql = `
        SELECT s.id, s.text, s.img, s.tikslas, s.surinkta, s.status, s.user_id, u.id AS user_id
        FROM stories AS s
        INNER JOIN users AS u
        ON s.user_id = u.id
    `;

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    })

});

app.get(url + 'donations', (req, res) => {

    const storieId = req.query.storie_id;

    const sql = `
        SELECT d.id, d.name, d.sum, d.storie_id, s.id
        FROM donations AS d    
        INNER JOIN stories AS s
        ON d.storie_id = s.id
        WHERE d.storie_id = ?
    `;

    con.query(sql, [storieId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    })
});

app.get(url + 'auth', (req, res) => {
    const token = req.cookies.tokenas || 'no-token';

    const sql = `
    SELECT u.id, u.name, u.role, u.el_pastas
    FROM users AS u
    INNER JOIN sessions AS s
    ON u.id = s.author_id
    WHERE s.token = ?
    AND s.expires > NOW()
    `;

    con.query(sql, [token], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.length === 0) {
            res.status(200).json({
                name: 'Guest',
                role: 'guest',
                id: 0,
                email: ''
            });
            return;
        }
        res.json(result[0])
    })

});

app.post(url + 'login', (req, res) => {

    const { email, passw } = req.body;
    const hashedPassword = md5(passw);

    const sql = `
        SELECT id, name, el_pastas, role
        FROM users
        WHERE el_pastas = ?
        AND password = ?
    `;

    con.query(sql, [email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database query error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        const token = md5(uuidv4());

        res.cookie('tokenas', token, { httpOnly: true });

        const sqlInsertSession = `
            INSERT INTO sessions (token, author_id, expires)
            VALUES (?, ?, ?)
        `;

        con.query(sqlInsertSession, [token, result[0].id, new Date(Date.now() + 1000 * 60 * 60 * 24)], (err) => {
            if (err) {
                console.error('Error inserting session:', err);
                return res.status(500).json({ message: 'Session creation error' });
            }

            res.json({ success: true, user: result[0] });
        });
    });
});

app.post(url + 'logout', (req, res) => {
    const token = req.cookies.tokenas || 'no-token';

    const sql = `
        DELETE FROM sessions
        WHERE token = ?
    `;

    con.query(sql, [token], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Session deletion error' });
        }
        res.clearCookie('tokenas');
        res.json({
            name: 'Guest',
            role: 'guest',
            id: 0,
            email: ''
        });
    })
})

app.post(url + 'register', (req, res) => {
    const { name, email, passw } = req.body;

    const hashPass = md5(passw);

    const emailCheck = `
        SELECT * FROM users
        WHERE el_pastas = ?
    `;

    con.query(emailCheck, [email], (err, result) => {
        if (err) {
            console.error('Error during query:', err);
            return res.status(500).json({ message: 'Database query error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const sql = `
            INSERT INTO users (name, el_pastas, password, role)
            VALUES (?, ?, ?, ?)
        `;

        con.query(sql, [name, email, hashPass, 'user'], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ message: 'User creation error' });
            }

            res.json({
                success: true,
                message: 'User registered successfully.',
                user: {
                    id: result.insertId,
                    name,
                    email,
                    role: 'user'
                }
            });
        });
    });
});


app.post(url + 'stories', (req, res) => {
    const { text, tikslas, img, user_id, status } = req.body;

    const sql = `
        INSERT INTO stories (text, tikslas, img, user_id, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    con.query(sql, [text, tikslas, img, user_id, status], (err) => {
        if (err) {
            console.log(err);

        }
        res.json({ success: true })
    })
});

app.put(url + 'approve/:id', (req, res) => {
    const { id } = req.params;

    const sql = ` 
        UPDATE stories
        SET status = ?
        WHERE id = ?
    `;

    con.query(sql, ['patvirtinta', id], (err) => {

        if (err) {
            console.log(err);
        }

        res.status(200).json({ success: true })
    })
});

app.delete(url + 'delete/:id', (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM stories WHERE id = ?`;

    con.query(sql, [id], (err) => {
        if (err) {
            console.log(err);

        }
        res.status(200).json({ success: true })
    })
});

app.put(url + 'donate', (req, res) => {
    const { name, amount, storieId } = req.body;

    const sql = `
    INSERT INTO donations (name, sum, storie_id)
    VALUES (?, ?, ?)
`;

    con.query(sql, [name, amount, storieId], (err) => {
        if (err) {
            console.log(err);
        }

        const updateStorySQL = `
            UPDATE stories
            SET surinkta = surinkta + ?
            WHERE id = ?
        `;

        con.query(updateStorySQL, [amount, storieId], (err) => {
            if (err) {
                console.log(err);

            }
            res.json({ success: true })
        })
    })
})


app.listen(port, () => {
    console.log(`Fond serveris darbui pasiruošęs ant ${port} porto!`);
});