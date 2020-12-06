import { clearSession } from "app/api-session"
import { NextApiRequest, NextApiResponse } from "next"

export default async function logout(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	clearSession(res)
	res.json({ success: true })
}
