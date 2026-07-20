import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execPromise = util.promisify(exec);

export async function POST(req: Request) {
  try {
    const { parcel_id } = await req.json();

    if (!parcel_id) {
      return NextResponse.json({ error: 'Missing parcel_id' }, { status: 400 });
    }

    // Use string concatenation to hide from Turbopack static analysis
    const root = process.cwd();
    const venvPython = root + '/venv/bin/python';
    const scriptPath = root + '/scout_parcel.py';

    const { stdout, stderr } = await execPromise(`"${venvPython}" "${scriptPath}" "${parcel_id}"`);

    if (stderr) {
      console.warn("Python stderr:", stderr);
    }

    // Parse the JSON output from the script
    const result = JSON.parse(stdout.trim());

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
