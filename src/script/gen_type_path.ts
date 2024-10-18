const regex = /\[(.*?)\]/g;
export async function generateSaveTypeSafePath() {
  const { PATHS } = await import('src/constant/allPaths');
  //   const { API_PATHS } = await import('../src/constant/apiPaths');
  const res = { pages: {}, api: {} };
  PATHS.filter((item) => !item.startsWith('/api')).forEach((key) => {
    const temp: string[] = [];
    let match;
    while ((match = regex.exec(key)) !== null) {
      temp.push(match[1] as string);
    }
    if (temp.length) (res['pages'] as any)[key] = temp;
  });
  return res;
}
