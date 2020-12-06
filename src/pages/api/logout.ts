import { NextApiRequest, NextApiResponse } from "next"
import { clearSession } from "../../app/api-session"

export default async function logout(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	clearSession(res)
	res.json({ success: true })
}
