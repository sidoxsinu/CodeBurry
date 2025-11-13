import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET || 'dev-secret-change-me';

export function authRequired(req, res, next) {
	const token = req.cookies?.token;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded;
		next();
	} catch (e) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}

export function requireRole(role) {
	return (req, res, next) => {
		if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
		if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
		next();
	};
}
