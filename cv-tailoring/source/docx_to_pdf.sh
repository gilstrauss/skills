#!/bin/zsh
# Convert a CV docx to PDF with Microsoft Word, keeping the docx's layout.
# Usage: docx_to_pdf.sh <input.docx>   -> writes <input>.pdf next to it.
# Word's AppleScript "save as" rejects full paths (error -1708). A bare file
# name works but lands in Word's sandbox Documents folder, so move it from there.
set -e
in="${1:A}"; name="${in:t:r}.pdf"; out="${in:h}/$name"
[[ -f "$in" ]] || { echo "No such file: $in" >&2; exit 1; }
box="$HOME/Library/Containers/com.microsoft.Word/Data/Documents/$name"
rm -f "$out" "$box"
osascript <<OSA
tell application id "com.microsoft.Word"
  -- an already-open copy would be exported instead of the freshly built file
  close (every document whose name is "${in:t}") saving no
  open POSIX file "$in"
  delay 2
  save as active document file name "$name" file format format PDF
  close active document saving no
end tell
OSA
for i in {1..10}; do [[ -f "$box" ]] && break; sleep 1; done
[[ -f "$box" ]] && mv "$box" "$out"
[[ -f "$out" ]] || { echo "PDF not created" >&2; exit 1; }
pages=$(python3 -c "import re,sys;print(len(re.findall(rb'/Type\s*/Page[^s]',open(sys.argv[1],'rb').read())))" "$out")
echo "Built $out ($pages page(s))"
(( pages > 1 )) && echo "WARNING: more than one page - check for a spilled last section." >&2
exit 0
