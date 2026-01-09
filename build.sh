# 1. 깔끔하게 시작
rm -rf output
mkdir output

# 2. 일단 다 복사 (숨겨진 파일 포함)
# .git이나 node_modules를 제외하고 복사
cp -R ./* ./output/ 2>/dev/null || true

# 3. 절대 넘어가면 안 되는 것들만 골라서 삭제
rm -rf ./output/node_modules
rm -rf ./output/.git
rm -rf ./output/output