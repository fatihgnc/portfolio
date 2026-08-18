import { MDXRemote } from "next-mdx-remote/rsc";

/**
 * MDX gövdesini sunucuda render eder. Sonuç, dil değişiminde anında
 * takas edilebilmesi için istemci bileşenlerine hazır düğüm olarak geçer.
 */
export default function MdxBody({ source }: { source: string }) {
  return (
    <div className="case-body">
      <MDXRemote source={source} />
    </div>
  );
}
